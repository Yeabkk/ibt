"use client";

import { useState, useEffect } from "react";
import useCartStore from "../stores/cartStore";

export default function AddToCartButton({ dish, compact = false }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => {
      setAdded(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, [added]);

  function handleAdd() {
    addItem(dish);
    setAdded(true);
  }

  return (
    <button className="add-button" type="button" onClick={handleAdd} aria-label={`Add ${dish.name} to cart`}>
      {added ? "Added ✓" : compact ? "Add to order +" : "Add to order"}
    </button>
  );
}
