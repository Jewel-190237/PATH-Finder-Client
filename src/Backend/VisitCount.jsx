export const updateVisitCount = async (userId) => {
  if (!userId) {
    throw new Error("UserId is required");
  }

  try {
    const response = await fetch(`http://localhost:5000/visit-count/${userId}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to update visit count");
    }

    const data = await response.json();
    return data.visitCount; 
  } catch (error) {
    console.error("Error updating visit count:", error);
    throw error;
  }
};
