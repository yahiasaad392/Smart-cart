export const BASE_URL = 'https://ecommerce.routemisr.com';

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE_URL}/api/v1${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || `API Error: ${res.status}`);
  }

  return res.json();
}

export async function getCategoriesWithProducts() {
  const [categoriesData, productsData] = await Promise.all([
    fetchAPI('/categories'),
    fetchAPI('/products?limit=1000')
  ]);

  const usedCategoryIds = new Set(productsData.data.map((p: any) => p.category._id));
  
  const filteredCategories = categoriesData.data.filter((c: any) => usedCategoryIds.has(c._id));
  
  return { ...categoriesData, data: filteredCategories };
}
