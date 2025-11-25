# React Take-Home Task: GraphQL + Forms

### Objective

Build a small React app that fetches data via GraphQL, displays it, and allows editing through a form with validation.

---

### **Libraries to Use**

- **React + TypeScript** – create the project using Vite React + TypeScript template
- **urql** – GraphQL client
- **react-hook-form** – manage form state
- **Zod** – validation schemas
- Ui library pick what you like

---

### **Requirements**

1. **Data Fetching**
   - Use the public GraphQL API: [https://graphqlzero.almansi.me/api](https://graphqlzero.almansi.me/api)
   - Fetch **first 5 posts** with fields: `title` and `body`.
   - Store posts in component state.
2. **Display**
   - Show posts in a list or table.
   - Clicking a post opens edit form in a popup.
3. **Form**
   - Show a form with **multiple fields** for the selected post (`title` + `body`).
   - Use **react-hook-form** for **with controlled inputs.**
   - Use **Zod** for validation:
     - `title` and `body` required.
   - On submit, update the post **in-memory** and update the list.

---

### **Deliverables**

- Working React app.
- In-memory updates are reflected in the UI.
- Clean, maintainable code.
- Proper use of typescript without using `unknown` or `any` types, or excessive use of `as`

###
