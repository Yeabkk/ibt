export function jsonError(message, status = 400, details) {
  return Response.json(
    { error: message, ...(details ? { details } : {}) },
    { status },
  );
}

export async function readJson(request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return { data: null, response: jsonError("Expected a JSON object.", 400) };
    }
    return { data: body, response: null };
  } catch {
    return { data: null, response: jsonError("Request body must be valid JSON.", 400) };
  }
}

export function validationError(error) {
  return jsonError("Validation failed.", 422, error.flatten().fieldErrors);
}

export function internalError() {
  return jsonError("An unexpected server error occurred.", 500);
}
