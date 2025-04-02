const uploadImage = async (file) => {
    if (!file) {
        return null; // Handle the case where no file is selected
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "echo-chat-app"); // Replace with your Cloudinary upload preset
    data.append("cloud_name", "dnxd86qnx"); // Replace with your Cloudinary cloud name

    try {
        const response = await fetch("https://api.cloudinary.com/v1_1/dnxd86qnx/image/upload", {
            method: "POST",
            body: data,
        });
        const result = await response.json();
        return result.url; // Return the uploaded image URL
    } catch (error) {
        console.error("Error uploading image:", error);
        return null; // Handle error appropriately
    }
};

export default uploadImage;