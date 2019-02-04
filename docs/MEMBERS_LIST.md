# **Liste des membres**

`GET /members`

Retourne la liste des membres du projet

### **Success Response:**

**Status Code:** 200 <br />
**Body:**

```json
[
  {
    "id": 16043892,
    "iid": 3,
    "title": "No time",
    "description": "no time estimated",
    "state": "opened",
    "labels": [],
    "assigneeId": null,
    "webUrl": "https://gitlab.com/institut-g4-lyon/on-teste-des-trucs/issues/3",
    "estimatedTime": 0,
    "spentTime": {}
  },
  {
    "id": 16016472,
    "iid": 2,
    "title": "Aazeazeaz",
    "description": "ID: 1.1\n\nDescription:\nAazeazeaz\n\nTechnique:\nAazeazeaz",
    "state": "opened",
    "labels": [],
    "assigneeId": 415082,
    "webUrl": "https://gitlab.com/institut-g4-lyon/on-teste-des-trucs/issues/2",
    "estimatedTime": 7200,
    "spentTime": {
      "Jeremy84": 7200,
      "MaximeBlanc": 5400
    }
  },
  {
    "id": 16016357,
    "iid": 1,
    "title": "Ajouter l'index.html",
    "description": "ID: 2.8\n\nDescription:\nAjouter l'index.html avec un \"Hello World!\"\n\nTechnique:\n`touch index.html`\n!DOCTYPE...",
    "state": "opened",
    "labels": ["To Do"],
    "assigneeId": 907289,
    "webUrl": "https://gitlab.com/institut-g4-lyon/on-teste-des-trucs/issues/1",
    "estimatedTime": 3600,
    "spentTime": {}
  }
]
```
