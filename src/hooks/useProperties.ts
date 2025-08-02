import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { propertyAPI } from "@/api";
import { PropertySearchFilters } from "@/types/property";

export function useProperties(filters?: PropertySearchFilters) {
  return useQuery({
    queryKey: ["properties", filters],
    queryFn: () => propertyAPI.getProperties(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useProperty(id: number) {
  return useQuery({
    queryKey: ["property", id],
    queryFn: () => propertyAPI.getProperty(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function usePropertyMapData() {
  return useQuery({
    queryKey: ["properties", "map"],
    queryFn: () => propertyAPI.getMapData(),
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
}

export function useIncrementViews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => propertyAPI.incrementViews(id),
    onSuccess: (_, id) => {
      // Invalidate and refetch property data
      queryClient.invalidateQueries({ queryKey: ["property", id] });
    },
  });
}

export function useSearchProperties() {
  return useMutation({
    mutationFn: (filters: PropertySearchFilters) =>
      propertyAPI.searchProperties(filters),
  });
}

// Featured properties hook
export function useFeaturedProperties() {
  return useQuery({
    queryKey: ["properties", "featured"],
    queryFn: () => propertyAPI.getProperties({ featured: true } as any),
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}
