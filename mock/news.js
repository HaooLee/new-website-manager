export default {
  'POST /news/getinfo1/:id':{
  },

  'POST /news/detail':{
    "nid": 2,
    "news_title": "测试2",
    "news_des": "这也是一个测试",
    "news_time": "2020-03-03 23:44:55",
    "creater": "羊羊羊1",
    "is_release": 0,
    "news_souce": "测试源2",
    "content": ""
  },
  'POST /news/getinfo':function (req, res) {
    res.send([
      {
        "nid": 1,
        "news_title": "测试1",
        "news_des": "这是一个测试",
        "news_time": "2020-03-03 23:42:25",
        "creater": "杨寒松1",
        "is_release": 1,
        "news_souce": "测试源1",
        "content": "内容1"
      },
      {
        "nid": 2,
        "news_title": "测试2",
        "news_des": "这也是一个测试",
        "news_time": "2020-03-03 23:44:55",
        "creater": "羊羊羊1",
        "is_release": 0,
        "news_souce": "测试源2",
        "content": "内容2"
      },
      {
        "nid": 3,
        "news_title": "asd",
        "news_des": "12w",
        "news_time": "2020-03-04 01:03:39",
        "creater": "asd1",
        "is_release": 0,
        "news_souce": "123",
        "content": "123"
      },
      {
        "nid": 4,
        "news_title": "123",
        "news_des": "zxc",
        "news_time": "2020-03-04 01:03:57",
        "creater": "123",
        "is_release": 0,
        "news_souce": "123",
        "content": "asd"
      },
      {
        "nid": 5,
        "news_title": "zzxc",
        "news_des": "zxc",
        "news_time": "2020-03-04 01:04:18",
        "creater": "zxc",
        "is_release": 0,
        "news_souce": "zxc",
        "content": "zxc"
      }
    ])
  }
}
