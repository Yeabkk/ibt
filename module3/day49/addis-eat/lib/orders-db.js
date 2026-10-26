import "server-only";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "orders.json");

// In-memory cache for fast, synchronous reads & writes
let ordersCache = null;

function ensureLoaded() {
  if (ordersCache !== null) return ordersCache;

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf8");
      ordersCache = JSON.parse(raw);
    } else {
      ordersCache = [];
      fs.writeFileSync(DATA_FILE, JSON.stringify(ordersCache, null, 2), "utf8");
    }
  } catch (err) {
    console.error("Failed to load orders store, falling back to memory:", err);
    ordersCache = [];
  }
  return ordersCache;
}

function persistToDisk() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(ordersCache, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to persist orders to disk:", err);
  }
}

/**
 * Creates and persists a new order keyed by the authenticated user's ID.
 */
export async function createOrder({ userId, userName, phone, area, notes, items, total }) {
  ensureLoaded();
  const orderId = `ORD-${randomUUID().slice(0, 8).toUpperCase()}`;
  const newOrder = {
    id: orderId,
    userId,
    userName,
    phone,
    area,
    notes: notes || "",
    items,
    total,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  ordersCache.unshift(newOrder);
  persistToDisk();
  return newOrder;
}

/**
 * Retrieve an order by its unique ID.
 */
export async function getOrderById(orderId) {
  ensureLoaded();
  return ordersCache.find((o) => o.id === orderId) || null;
}

/**
 * Retrieve all orders belonging to a specific user.
 */
export async function getOrdersByUserId(userId) {
  ensureLoaded();
  return ordersCache.filter((o) => o.userId === userId);
}

/**
 * Cancels an order with STRICT ownership validation.
 * Blocks Attack 2: A signed-in user attempting to mutate someone else's record.
 */
export async function cancelUserOrder({ orderId, userId }) {
  ensureLoaded();
  const order = ordersCache.find((o) => o.id === orderId);

  if (!order) {
    return { success: false, code: 404, error: "Order not found." };
  }

  // Attack 2 Guard: Exact line checking record ownership against authenticated session ID
  if (order.userId !== userId) {
    return { success: false, code: 403, error: "Forbidden: You do not have permission to modify this order." };
  }

  if (order.status === "cancelled") {
    return { success: false, code: 400, error: "Order is already cancelled." };
  }

  order.status = "cancelled";
  order.cancelledAt = new Date().toISOString();
  persistToDisk();

  return { success: true, code: 200, order };
}
