##### Issues
when db not start cause have no permission to create dir e.g.

`mkdir: cannot create directory`

fix by this command

```sh
sudo chown -R 1001 ./db
```