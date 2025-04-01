"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  X,
  Plus,
  Upload,
  MoveLeftIcon,
} from "lucide-react";
import Link from "next/link";

const Page = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([""]);
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [previewImages, setPreviewImages] = useState([]);

  // Categories (you can replace with your own)
  const categories = [
    "Electronics",
    "Clothing",
    "Home & Kitchen",
    "Books",
    "Toys",
    "Beauty",
    "Sports",
    "Other",
  ];

  // Add a new feature field
  const addFeature = () => {
    setFeatures([...features, ""]);
  };

  // Update a feature at a specific index
  const updateFeature = (index, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    setFeatures(updatedFeatures);
  };

  // Remove a feature at a specific index
  const removeFeature = (index) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // Create image previews
    const newPreviewImages = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviewImages]);

    // Store the actual files
    setImages([...images, ...files]);
  };

  // Remove an image
  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);

    // Release the object URL to prevent memory leaks
    URL.revokeObjectURL(previewImages[index]);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);

    setImages(updatedImages);
    setPreviewImages(updatedPreviews);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Filter out empty features
    const nonEmptyFeatures = features.filter(
      (feature) => feature.trim() !== ""
    );

    // Create form data object
    const formData = {
      name,
      description,
      features: nonEmptyFeatures,
      images, // These would be processed differently in a real application
      price: parseFloat(price),
      quantity: parseInt(quantity),
      category,
    };

    console.log("Submitted item data:", formData);

    // Here you would typically send this data to your API
    // Example: await axios.post('/api/items', formData);
  };

  return (
    <Card className="w-full  mx-auto">
      <CardHeader>
        <Link href={"/inventory"}>
          <span className=" flex flex-row gap-2 mb-3">
            <MoveLeftIcon />
            <span>Go Back</span>
          </span>
        </Link>
        <CardTitle>Add New Item</CardTitle>
        <CardDescription>
          Fill in the details to add a new item to your inventory.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {/* Item Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter item name"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter item description"
              rows={4}
              required
            />
          </div>

          {/* Features List */}
          <div className="space-y-2">
            <Label>Features</Label>
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <Input
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  placeholder={`Feature ${index + 1}`}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeFeature(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addFeature}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Feature
            </Button>
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <Label>Images</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <Input
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Label
                htmlFor="image-upload"
                className="flex flex-col items-center cursor-pointer"
              >
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <span className="text-sm font-medium">
                  Drag & drop images here or click to browse
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  You can upload multiple images
                </span>
              </Label>
            </div>

            {/* Image Previews */}
            {previewImages.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {previewImages.map((src, index) => (
                  <div key={index} className="relative">
                    <img
                      src={src}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price, Quantity, and Category */}
          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  $
                </span>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="pl-6"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end space-x-2">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Save Item</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Page;
