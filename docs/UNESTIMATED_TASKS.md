# **Taches non estimées**

`GET /tasks/unestimated`

Retourne un tableau des issues Gitlab sans temps estimé. Retourne un tableau vide si toutes les tâches sont estimées

### **Success Response:**

**Status Code:** 200 <br />
**Body:**

```json
[
  {
    "iid": 3,
    "title": "No time",
    "description": "no time estimated",
    "state": "opened",
    "labels": [],
    "assignee": null,
    "webUrl": "https://gitlab.com/institut-g4-lyon/on-teste-des-trucs/issues/3",
    "time_stats": {
      "time_estimate": 0,
      "total_time_spent": 0,
      "human_time_estimate": null,
      "human_total_time_spent": null
    }
  }
]
```
