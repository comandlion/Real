import { useProperties } from "@/hooks/useProperties";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";

export function APITest() {
  const { data, isLoading, error } = useProperties();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
          {error && <AlertCircle className="h-5 w-5 text-red-500" />}
          {data && <CheckCircle className="h-5 w-5 text-green-500" />}
          Django API Connection Test
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading && (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-luxury-blue" />
            <p className="text-gray-600 mt-2">Connecting to Django API...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
            <h3 className="text-lg font-semibold text-red-700 mb-2">
              Connection Failed
            </h3>
            <p className="text-red-600 text-sm">
              {error instanceof Error ? error.message : "Failed to connect to Django API"}
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Make sure your Django server is running on http://localhost:8000
            </p>
          </div>
        )}

        {data && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-semibold text-green-700">
                Successfully connected to Django API!
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-700">
                  {data.count || 0}
                </div>
                <div className="text-sm text-green-600">Total Properties</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">
                  {data.results?.length || 0}
                </div>
                <div className="text-sm text-blue-600">Current Page</div>
              </div>
            </div>

            {data.results && data.results.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold">Sample Properties:</h4>
                {data.results.slice(0, 3).map((property) => (
                  <div
                    key={property.id}
                    className="p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium">{property.title}</h5>
                        <p className="text-sm text-gray-600">
                          {property.city}, {property.state}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-luxury-blue">
                          ${property.price?.toLocaleString()}
                        </div>
                        <Badge
                          variant={
                            property.category === "land" ? "secondary" : "default"
                          }
                        >
                          {property.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
