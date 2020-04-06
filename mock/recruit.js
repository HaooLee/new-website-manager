export default {
  'POST /recruit/getinfo':function (req, res) {
    res.send([
      {
        "rid": 1,
        "job_title": "CEO",
        "creater": "杨寒松",
        "create_time": "2020-03-05 01:14:14",
        "working_place": "中关村",
        "working_city": "北京",
        "department": "P",
        "job_cate": "领导",
        "is_release": 0
      },
      {
        "rid": 2,
        "job_title": "CTO",
        "creater": "杨寒松",
        "create_time": "2020-03-05 01:15:20",
        "working_place": "中关村",
        "working_city": "北京",
        "department": "T",
        "job_cate": "领导",
        "is_release": 0
      }
    ])
  }
}
