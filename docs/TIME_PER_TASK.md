# **Temps par tâche**

`GET /tasks/:id_issue`

Retourne un ayant pour clé l'ID des issues et en valeur :

- un objet vide si rien n'a été imputé correctement
- une liste de couple `"pseudo": temps_en_secondes`

### **Success Response:**

**Status Code:** 200 <br />
**Body:**

```json
{
  "16016357": {},
  "16016472": {
    "Jeremy84": 7200,
    "MaximeBlanc": 5400
  }
}
```
