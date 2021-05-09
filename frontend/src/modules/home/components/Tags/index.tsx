import { PlusOutlined } from "@ant-design/icons";
import { Input, message, Tag as AntdTag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateTagMutation,
  useGetTagsByOwnerLazyQuery,
} from "../../../../common/services/generate/generate-types";
import { Store } from "../../../../common/store";
import { TagAction } from "../../../../common/store/tags";
import onEnter from "../../../../common/utils/onEnterKey";

const { CheckableTag } = AntdTag;

export interface TagsProps {
  tags?: TagType;
  selected?: string[];
  onAddNewTag?: () => void;
}

export type TagType = {
  _id: string;
  label: string;
  checked: boolean;
  createAt: Date;
}[];

const Tags: React.FC<TagsProps> = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((s: Store) => s.user.user._id);
  const [
    dataTagTrigger,
    { data: dataTags, loading },
  ] = useGetTagsByOwnerLazyQuery({
    variables: { userId },
    fetchPolicy: "network-only",
  });
  const tagsStore = useSelector((s: Store) => s.tags.tags);

  const [input, setInput] = useState<{
    visible: boolean;
    value: string;
  }>({
    visible: false,
    value: "",
  });

  const [tagCreateTag, { error }] = useCreateTagMutation({
    variables: {
      tag: {
        owner: userId,
        label: "",
      },
    },
  });

  // init data
  useEffect(() => {
    dataTagTrigger({ variables: { userId } });
  }, [dataTagTrigger, userId]);
  useEffect(() => {
    dataTags?.listAllTag.result &&
      dispatch(TagAction.updateTag({ data: dataTags?.listAllTag.result }));
  }, [dataTagTrigger, dataTags?.listAllTag.result, dispatch]);

  const onNewtag = () => {
    setInput((i) => ({ ...i, visible: true }));
  };

  const onFinishNewtag = async (label?: string) => {
    setInput((i) => ({ ...i, visible: false }));
    if (!label) return;

    const tagCreated = await tagCreateTag({
      variables: { tag: { owner: userId, label } },
    });

    tagCreated.data &&
      dispatch(TagAction.appendTag({ data: tagCreated.data.createTag }));
    props.onAddNewTag && props.onAddNewTag();
  };

  const onSelect = (id: string) => {};

  if (error) {
    message.error("Duplicated label");
  }

  return (
    <>
      <div>
        {loading && <span>Loading ...</span>}

        {tagsStore.map((el) => (
          <CheckableTag
            key={el._id}
            onClick={() => onSelect(el._id)}
            checked={false}
            // checked={el.checked}
            style={{ minWidth: 40, textAlign: "center" }}
          >
            <>
              <AntdTag style={{ width: "100%" }}>{el.label}</AntdTag>
            </>

            {/* {!el.checked && (
              <>
                <AntdTag>
                  {el.label}
                  <CloseOutlined
                    onClick={() => onDelete(el._id)}
                    style={{ marginLeft: "2em", cursor: "pointer" }}
                  />
                </AntdTag>
              </>
            )} */}
            {/* {el.checked && (
              <>
                {el.label}
                <CloseOutlined
                  onClick={() => onDelete(el._id)}
                  style={{ marginLeft: "2em", cursor: "pointer" }}
                />
              </>
            )} */}
          </CheckableTag>
        ))}
        <AntdTag onClick={onNewtag}>
          {!input.visible && (
            <>
              <PlusOutlined /> New Tag
            </>
          )}

          {input.visible && (
            <Input
              autoFocus={true}
              size="small"
              onKeyPress={onEnter(onFinishNewtag)}
            />
          )}
        </AntdTag>
      </div>
    </>
  );
};

export default Tags;
