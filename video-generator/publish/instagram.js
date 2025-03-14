const { convertToDataURL } = require("../utils/convertToDataURL");
const ACCESS_TOKEN =
  "EAAJHY30LLuABO2WTbJGqO7xYENSKtBpAEVJAdzetFNC5ReuDP3tOX1xcYQ2gCyZCAO0shAJvopLKDkx5D3C5EkqGztVBeIIV4U74ZBkoDsR28nzDpXlOtSJ4Ikz0ozAKAwEkZAYOjCg0yHEbY4Xuw6APaXSCVhD8fQgz3axeMpBMr2BcKGhZBZB8HBnQpmtI1IJZCvvgjC6yZCyvaUCA3PqAkIjPnf7PZC3rav8ZD";
const YOUR_INSTAGRAM_ACCOUNT_ID = "122099039768803287";
const INSTAGRAM_GRAPH_API_URL = `https://graph.facebook.com/v18.0/${YOUR_INSTAGRAM_ACCOUNT_ID}/media`;

const publishToInstagram = async (imageUrl, caption) => {
  try {
    console.log("📢 Publishing to Instagram...");

    const image = convertToDataURL(imageUrl);

    if (!image) {
      console.log("❌ Image not found");
      return null;
    }

    // Step 1: Upload Media to Instagram
    const uploadResponse = await fetch(INSTAGRAM_GRAPH_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image_url: image,
        caption: caption,
        access_token: ACCESS_TOKEN,
      }),
    });

    const uploadData = await uploadResponse.json();

    if (!uploadData.id) {
      throw new Error(`Upload Failed: ${JSON.stringify(uploadData)}`);
    }

    console.log("✅ Media uploaded successfully:", uploadData);

    // Step 2: Publish the uploaded media
    const publishResponse = await fetch(
      `https://graph.facebook.com/v18.0/YOUR_INSTAGRAM_ACCOUNT_ID/media_publish`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creation_id: uploadData.id,
          access_token: ACCESS_TOKEN,
        }),
      }
    );

    const publishData = await publishResponse.json();

    if (!publishData.id) {
      throw new Error(`Publish Failed: ${JSON.stringify(publishData)}`);
    }

    console.log("🎉 Post published successfully:", publishData);
    return publishData;
  } catch (error) {
    console.error("❌ Error publishing to Instagram:", error.message);
    return null;
  }
};

module.exports = { publishToInstagram };
