import { LinkOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Tag } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BookmarkEditInputDto,
  useDeleteBookmarkMutation,
  useRestoreFromTrashMutation,
} from "../../../../common/services/generate/generate-types";
import { Store } from "../../../../common/store";
import { BookmarkAction } from "../../../../common/store/bookmark";
import Tags, { TagType } from "../Tags/index";
import {
  CardInputUrlStyle,
  CardTextAreaStyle,
  InputHeaderStyle,
} from "./styled";

const { Meta } = Card;

export interface CardProps {
  domain: string;
  original: string;
  note: string;
  _id: string;
  tags: TagType;
  onEdit?: (data: BookmarkEditInputDto) => void;
}

const VisibleCard: React.FC<CardProps & { onClick: () => void }> = (props) => (
  <div onClick={props.onClick}>
    <Meta title={props.domain} description={props.note} />
    <div style={{ height: "12px" }} />

    {/* tags */}
    {props.tags.map((el) => (
      <Tag key={el._id} style={{ minWidth: "3em", textAlign: "center" }}>
        {el.label}
      </Tag>
    ))}
  </div>
);

// EDIT CARD
const ExpandCard: React.FC<
  CardProps & { visible: boolean; onSave: (save: BookmarkEditInputDto) => void }
> = (props) => {
  const dispatch = useDispatch();
  const { confirm } = Modal;
  const alltags = useSelector((s: Store) => s.tags.tags);
  const selectedBookmarkTags = useSelector(
    (s: Store) => s.bookmark.selectedTag
  );
  const [original, setOriginal] = useState(props.domain);
  const [note, setNote] = useState(props.note);
  const [deleteBookmarkMutation] = useDeleteBookmarkMutation({
    variables: {
      bookmarkId: "", // value for 'bookmarkId'
    },
  });
  const [restoreFromTrashMutation] = useRestoreFromTrashMutation({
    variables: {
      bookmarkId: "", // value for 'bookmarkId'
    },
  });

  const selectedTags = props.tags.map((el) => el._id);
  const initTagsMapped = alltags.map((el) => ({
    ...el,
    checked: selectedTags.includes(el._id),
  }));
  console.log("selectedTags", selectedTags);
  console.log("initTagsMapped", initTagsMapped);

  const [tags, setTags] = useState(initTagsMapped);
  console.log("selectingTags", tags);

  const onSave = (s: boolean) => {
    dispatch(BookmarkAction.setUnSelectingBookmark());
    //   save with new
    s &&
      props.onSave({
        _id: props._id,
        original: original,
        note,
        tags: tags.filter((el) => el.checked).map((el) => el._id),
      });

    //   save the same
    !s &&
      props.onSave({
        _id: props._id,
        original: props.original,
        note: props.note,
      });
  };

  const onCancel = () => {
    dispatch(BookmarkAction.setUnSelectingBookmark());
    onSave(false);
  };

  const onOk = () => {
    onSave(true);
  };

  const onDelete = () => {
    deleteBookmarkMutation({
      variables: {
        bookmarkId: props._id,
      },
    });
    onCancel();
  };

  const showConfirm = () => {
    confirm({
      title: "Do you Want to delete this url?",
      icon: <ExclamationCircleOutlined />,
      content: "This item will be moved to trash",
      onOk() {
        onDelete();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const onSelectTag = (tagId: string) => {
    setTags((t) => {
      return t.map((el) => {
        const isSelecting = el._id === tagId;
        if (isSelecting) {
          return {
            ...el,
            checked: !el.checked,
          };
        }
        return el;
      });
    });
  };

  const onRestore = () => {
    restoreFromTrashMutation({
      variables: {
        bookmarkId: props._id,
      },
    });
    onCancel();
    window.location.reload(true);
  };

  const DeleteButton: React.FC<{ isDeleted: boolean }> = (props) =>
    props.isDeleted ? (
      <Button
        style={{ marginRight: "50%" }}
        type="primary"
        danger
        onClick={onRestore}
      >
        Restore
      </Button>
    ) : (
      <Button
        style={{ marginRight: "50%" }}
        type="primary"
        danger
        onClick={showConfirm}
      >
        Delete
      </Button>
    );

  return (
    <Modal
      style={{ zIndex: 2 }}
      closeIcon={<div />}
      visible={props.visible}
      onCancel={onCancel}
      onOk={onOk}
      footer={[
        <DeleteButton isDeleted={selectedBookmarkTags === "delete"} />,
        <Button onClick={onCancel}>Cancel</Button>,
        <Button type="primary" onClick={onOk}>
          Save
        </Button>,
      ]}
    >
      <InputHeaderStyle>
        <LinkOutlined />
        <CardInputUrlStyle
          value={original}
          onChange={(e) => setOriginal(() => e.target.value)}
        />
        <span style={{ fontWeight: "lighter" }}>{props.original}</span>
      </InputHeaderStyle>
      <div style={{ height: "12px" }} />

      <CardTextAreaStyle
        value={note}
        onChange={(e) => setNote(() => e.target.value)}
      />
      <div style={{ height: "4px" }} />
      <Tags
        tags={tags.map((el) => ({
          ...el,
          createAt: new Date(el.createAt),
        }))}
        onSelect={onSelectTag}
        onAddNewTag={(newTag) =>
          setTags((t) => [
            ...t,
            {
              _id: newTag._id,
              checked: true,
              createAt: newTag.createAt,
              label: newTag.label,
            },
          ])
        }
      />
    </Modal>
  );
};

// MAIN CARD

const Cards: React.FC<CardProps> = (props) => {
  const [expand, setExpand] = useState<boolean>(false);
  const dispatch = useDispatch();
  const owner = useSelector((s: Store) => s.user.user._id);
  // const [getBookmark] = useGetBookmarkLazyQuery()

  const onEdit = (data: BookmarkEditInputDto) => {
    setExpand(false);
    props.onEdit && props.onEdit(data);
  };

  console.log("props.tags", props.tags);

  const onClick = () => {
    setExpand(() => true);
    dispatch(
      BookmarkAction.setSetlectBookmark({
        selecting: {
          _id: props._id,
          domain: props.domain,
          note: props.note,
          original: props.original,
          owner,
          tags: props.tags,
        },
      })
    );
  };

  return (
    <Card hoverable>
      <VisibleCard {...props} onClick={onClick} />
      {expand && <ExpandCard {...props} visible={expand} onSave={onEdit} />}
    </Card>
  );
};
export default Cards;
