---
title: "QQNT 表情商城(marketface) 表情包的保存/存储解码 小记"
date: "2025-04-13"
tag: "小记"
excerpt: "记录了想保存qq表情包的过程的折腾老文章"
---

## 注意事项

本文章仅供小小的记录，请不要在无作者授权的情况下不合理地修改/商业化表情包;w;

---

## 直入正题

"心路历程"属于博主的一顿折腾，属于一种解决方案。

这里有更简单的方案:

将表情商城获得的表情包发送到聊天中，右键该表情包点击"添加到表情"，随即在收藏表情中点选表情但不发送
在发送框内右键图片即可使用另存为

(顺带一提，在"添加到表情"后，特定表情包文件夹会生成 特定名称_temp.gif 这就是你要的表情文件)

## 心路历程

闲来无事，我想要尝试将QQ表情商城中已经发布的表情包下载下来，随后批量在微信中添加这些表情 (因为微信上还没有发布)
于是我在电脑QQNT客户端上尝试右键...没有反应，双击也只有"添加到表情"等选项，甚至没有祖传的"收藏"另存为法

于是我开始寻找这些表情包的存放文件夹，路径为 聊天文件\Tencent Files\QQ号码\nt_qq\nt_data\Emoji\marketface\

文件夹内有许多表情包的编号，包括了你自己拥有的表情包，也有他人发送的表情包
如果需要寻找到自己拥有的表情包，可以尝试在此文件夹内搜索关键词"gray" "color"并定位特定的表情包存放文件夹

在文件夹内存放有 特定名称 特定名称_thu.png 特定名称_aio.png 为文件名的文件

那么只有特定名称的文件才应是原始图片?
但奈何本人并不懂这些文件是如何解码的(';w;')

这里使用了大佬**CloneWith**的Python反混淆处理脚本
([博文链接](https://clonewith.github.io/blog/2025/qqnt-%E5%B8%82%E5%9C%BA%E8%A1%A8%E6%83%85%E5%8C%85%E7%9A%84%E5%AD%98%E5%82%A8%E4%B8%8E%E8%A7%A3%E7%A0%81/#%E8%A7%A3%E7%A0%81%E4%B8%8E%E6%81%A2%E5%A4%8D))
```python
FILENAME = "test"

# Apply de-obfuscation: Keep 30 bytes, XOR next 20 bytes, repeat
chunk_size_keep = 30
chunk_size_xor = 20

with open(FILENAME, "rb") as f:
binary_data = f.read()

restored_bytes = bytearray()
index = 0

while index < len(binary_data):
# XOR 20 bytes
xor_chunk = binary_data[index:index + chunk_size_xor]
restored_bytes.extend(b ^ 0xFF for b in xor_chunk)
index += chunk_size_xor

# Keep 30 bytes
restored_bytes.extend(binary_data[index:index + chunk_size_keep])
index += chunk_size_keep

# Use binary mode for writing
with open("output", "wb") as opt:
opt.write(restored_bytes)
print("Wrote output file to `output`.")

opt.close()

f.close()
```
将test改为文件路径，这样做会输出一份output文件，其为.gif表情包文件

但有些表情包本来就是不动的...博主也还未找到解决方法得到.png表情包文件
或许后面会更新一下博文，找到方法:P