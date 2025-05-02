


export async function updatePlates(userPlates) {
  const response = await fetch("http://localhost:3010/kitchenorders", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ plates: userPlates }),
  });
    if (!response.ok) {
      console.log("Failed to send plates to kitchen");
      return;
    }
  }
  