import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { propertyAPI } from "@/api";
import { PropertySearchFilters } from "@/types/property";

export function useProperties(filters?: PropertySearchFilters) {
  return useQuery({
    queryKey: ["properties", filters],
    queryFn: () => propertyAPI.getProperties(filters),
  });
}

export function useProperty(id: number) {
  return useQuery({
    queryKey: ["property", id],
    queryFn: () => propertyAPI.getProperty(id),
  });
}

export function usePropertyMapData() {
  return useQuery({
    queryKey: ["properties", "map"],
    queryFn: () => propertyAPI.getMapData(),
  });
}

export function useIncrementViews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => propertyAPI.incrementViews(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["property", id] });
    },
  });
}