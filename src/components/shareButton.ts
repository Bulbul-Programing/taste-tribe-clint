export const handleShare = async (product: {
  description: string;
  id: string;
  name: string;
}) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: product.name,
        text: `Check out this amazing product: ${product.description}`,
        url: `http://localhost:3000/recipeDetails/${product.id}`,
      });
    } catch (error) {
      console.error("Error sharing product:", error);
    }
  } else {
    alert("Sharing is not supported in your browser.");
  }
};
