import React, { useEffect, useState } from "react";

function RecipeTableList() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [expandedIds, setExpandedIds] = useState([]); // 🆕 to track expanded rows

  useEffect(() => {
    fetch("https://dummyjson.com/recipes")
      .then((res) => {
        if (!res.ok) throw new Error("Something went wrong");
        return res.json();
      })
      .then((data) => setRecipes(data.recipes))
      .catch((err) => setError(err.message));
  }, []);

  // 🆕 Toggle handler
  const toggleShowAll = (id) => {
    setExpandedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2 style={{ fontSize: "30px", color: "#3b3b3b" }}>🍽 Recipes Table</h2>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <table
        border="1"
        cellPadding="10"
        style={{
          borderCollapse: "collapse",
          width: "100%",
          fontFamily: "Arial",
          backgroundColor: "#1e1e1e",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(255, 255, 255, 0.05)",
          overflow: "hidden"

        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Calories</th>
            <th>Prep Time</th>
            <th>Cook Time</th>
            <th>Ingredients</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => {
            const isExpanded = expandedIds.includes(recipe.id);
            const ingredientsToShow = isExpanded
              ? recipe.ingredients
              : recipe.ingredients.slice(0, 3);

            return (
              <tr key={recipe.id}>
                <td>{recipe.id}</td>
                <td>
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    style={{
                      width: "100px",
                      height: "70px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{recipe.name}</td>
                <td>{recipe.caloriesPerServing}</td>
                <td>{recipe.prepTimeMinutes} mins</td>
                <td>{recipe.cookTimeMinutes} mins</td>
                <td>
                  <ul style={{ paddingLeft: "20px" }}>
                    {ingredientsToShow.map((ing, idx) => (
                      <li key={idx}>{ing}</li>
                    ))}
                  </ul>
                  {recipe.ingredients.length > 3 && (
                    <button
                      onClick={() => toggleShowAll(recipe.id)}
                      style={{
                        marginTop: "5px",
                        cursor: "pointer",
                        background: "transparent",
                        border: "none",
                        color: "#ffff",
                        textDecoration: "underline",
                        fontSize: "14px",
                        backgroundColor: "red",
                        textDecorationLine: "none",
                        fontWeight: "bold"
                      }}
                    >
                      {isExpanded ? "Show Less" : "Show More"}
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RecipeTableList;
