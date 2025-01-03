export async function handleRequest(method: string, url: string, parsedBody: Record<string, unknown> | null) {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: parsedBody ? JSON.stringify(parsedBody) : null,
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error making request:", error);
    return { error: (error as Error).message };
  }
}
