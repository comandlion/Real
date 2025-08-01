import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
  Text,
  Box,
  Sphere,
  Plane,
} from "@react-three/drei";
import { Suspense, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  RotateCcw,
  Home,
  TreePine,
  Maximize2,
  Eye,
  Camera,
  Move3D,
  Zap,
} from "lucide-react";
import * as THREE from "three";

interface Property3DViewerProps {
  propertyType: "real_estate" | "land";
  propertySubType?: string;
  title: string;
  dimensions?: {
    width: number;
    length: number;
    height?: number;
  };
  features?: string[];
  onViewChange?: (view: "exterior" | "interior" | "aerial") => void;
  className?: string;
}

// 3D House Component
function House({
  dimensions = { width: 10, length: 12, height: 8 },
}: {
  dimensions?: any;
}) {
  const houseRef = useRef<THREE.Group>(null);

  return (
    <group ref={houseRef} position={[0, dimensions.height / 2, 0]}>
      {/* Main house structure */}
      <Box
        args={[dimensions.width, dimensions.height, dimensions.length]}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial color="#e5e7eb" />
      </Box>

      {/* Roof */}
      <Box
        args={[dimensions.width + 1, 2, dimensions.length + 1]}
        position={[0, dimensions.height / 2 + 1, 0]}
      >
        <meshStandardMaterial color="#7c3aed" />
      </Box>

      {/* Door */}
      <Box
        args={[1.5, 3, 0.2]}
        position={[
          0,
          -dimensions.height / 2 + 1.5,
          dimensions.length / 2 + 0.1,
        ]}
      >
        <meshStandardMaterial color="#8b4513" />
      </Box>

      {/* Windows */}
      <Box args={[2, 1.5, 0.1]} position={[3, 1, dimensions.length / 2 + 0.1]}>
        <meshStandardMaterial color="#87ceeb" />
      </Box>
      <Box args={[2, 1.5, 0.1]} position={[-3, 1, dimensions.length / 2 + 0.1]}>
        <meshStandardMaterial color="#87ceeb" />
      </Box>

      {/* Garage */}
      <Box
        args={[4, 3, 6]}
        position={[dimensions.width / 2 + 2, -dimensions.height / 2 + 1.5, 0]}
      >
        <meshStandardMaterial color="#d1d5db" />
      </Box>
    </group>
  );
}

// 3D Land Plot Component
function LandPlot({
  dimensions = { width: 50, length: 60 },
}: {
  dimensions?: any;
}) {
  const landRef = useRef<THREE.Group>(null);

  return (
    <group ref={landRef}>
      {/* Land base */}
      <Plane
        args={[dimensions.width, dimensions.length]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial color="#22c55e" />
      </Plane>

      {/* Property boundaries */}
      <group>
        {/* Boundary markers */}
        <Sphere
          args={[0.5]}
          position={[dimensions.width / 2, 0.5, dimensions.length / 2]}
        >
          <meshStandardMaterial color="#ef4444" />
        </Sphere>
        <Sphere
          args={[0.5]}
          position={[-dimensions.width / 2, 0.5, dimensions.length / 2]}
        >
          <meshStandardMaterial color="#ef4444" />
        </Sphere>
        <Sphere
          args={[0.5]}
          position={[dimensions.width / 2, 0.5, -dimensions.length / 2]}
        >
          <meshStandardMaterial color="#ef4444" />
        </Sphere>
        <Sphere
          args={[0.5]}
          position={[-dimensions.width / 2, 0.5, -dimensions.length / 2]}
        >
          <meshStandardMaterial color="#ef4444" />
        </Sphere>
      </group>

      {/* Trees for landscaping */}
      <group>
        <Sphere args={[2]} position={[10, 2, 15]}>
          <meshStandardMaterial color="#16a34a" />
        </Sphere>
        <Box args={[0.8, 4, 0.8]} position={[10, 2, 15]}>
          <meshStandardMaterial color="#a16207" />
        </Box>

        <Sphere args={[1.5]} position={[-12, 1.5, -20]}>
          <meshStandardMaterial color="#16a34a" />
        </Sphere>
        <Box args={[0.6, 3, 0.6]} position={[-12, 1.5, -20]}>
          <meshStandardMaterial color="#a16207" />
        </Box>
      </group>

      {/* Development potential outline */}
      <Box args={[20, 0.1, 25]} position={[0, 0.05, 0]}>
        <meshStandardMaterial color="#3b82f6" transparent opacity={0.3} />
      </Box>
    </group>
  );
}

// Loading component
function LoadingModel() {
  return (
    <Box args={[1, 1, 1]}>
      <meshStandardMaterial color="#e5e7eb" />
    </Box>
  );
}

export function Property3DViewer({
  propertyType,
  propertySubType,
  title,
  dimensions,
  features = [],
  onViewChange,
  className = "",
}: Property3DViewerProps) {
  const [currentView, setCurrentView] = useState<
    "exterior" | "interior" | "aerial"
  >("exterior");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(true);

  const cameraPositions = {
    exterior: [15, 10, 15],
    interior: [0, 5, 0],
    aerial: [0, 30, 0],
  };

  const handleViewChange = (view: "exterior" | "interior" | "aerial") => {
    setCurrentView(view);
    onViewChange?.(view);
  };

  const resetCamera = () => {
    setCurrentView("exterior");
  };

  return (
    <Card
      className={`border-0 shadow-lg overflow-hidden ${className} ${isFullscreen ? "fixed inset-0 z-50" : ""}`}
    >
      <CardContent className="p-0 relative">
        <div
          className={`relative ${isFullscreen ? "h-screen" : "h-96"} bg-gradient-to-b from-sky-200 to-green-100`}
        >
          <Canvas>
            <Suspense fallback={<LoadingModel />}>
              <PerspectiveCamera
                makeDefault
                position={
                  cameraPositions[currentView] as [number, number, number]
                }
                fov={60}
              />

              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                maxPolarAngle={Math.PI / 2}
                minDistance={5}
                maxDistance={100}
              />

              {/* Enhanced Lighting Setup */}
              <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
              <ambientLight intensity={0.4} />
              <pointLight position={[-10, 10, -10]} intensity={0.6} />
              <pointLight position={[10, 5, 10]} intensity={0.4} color="#ffeb3b" />
              <hemisphereLight
                skyColor="#87CEEB"
                groundColor="#8B4513"
                intensity={0.3}
              />

              {/* Render appropriate 3D model based on property type */}
              {propertyType === "real_estate" ? (
                <House dimensions={dimensions} />
              ) : (
                <LandPlot dimensions={dimensions} />
              )}

              {/* Ground plane */}
              <Plane
                args={[100, 100]}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -0.1, 0]}
              >
                <meshStandardMaterial color="#65a30d" />
              </Plane>
            </Suspense>
          </Canvas>

          {/* Controls Overlay */}
          <motion.div
            className="absolute top-4 right-4 flex flex-col space-y-2 z-10"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white shadow-lg"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={resetCamera}
                className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white shadow-lg"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowInfo(!showInfo)}
                className="bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white shadow-lg"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>

          {/* View Toggle */}
          <motion.div
            className="absolute top-4 left-4 flex space-x-2 z-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            {(["exterior", "interior", "aerial"] as const).map((view) => (
              <motion.div
                key={view}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={currentView === view ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleViewChange(view)}
                  className={`bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white shadow-lg capitalize ${
                    currentView === view
                      ? "bg-luxury-blue text-white hover:bg-blue-600"
                      : ""
                  }`}
                >
                  {view === "exterior" && <Home className="h-4 w-4 mr-1" />}
                  {view === "interior" && <Move3D className="h-4 w-4 mr-1" />}
                  {view === "aerial" && <Camera className="h-4 w-4 mr-1" />}
                  {view}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Property Info Overlay */}
          {showInfo && (
            <motion.div
              className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg z-10 max-w-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Badge
                  className={`${propertyType === "land" ? "bg-emerald-500" : "bg-luxury-blue"} text-white`}
                >
                  {propertyType === "land" ? (
                    <TreePine className="h-3 w-3 mr-1" />
                  ) : (
                    <Home className="h-3 w-3 mr-1" />
                  )}
                  {propertyType === "land" ? "Land" : "Real Estate"}
                </Badge>
                {propertySubType && (
                  <Badge variant="secondary" className="text-xs">
                    {propertySubType}
                  </Badge>
                )}
              </div>

              <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>

              {dimensions && (
                <div className="text-sm text-gray-600 mb-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>Width: {dimensions.width}ft</div>
                    <div>Length: {dimensions.length}ft</div>
                    {dimensions.height && (
                      <div>Height: {dimensions.height}ft</div>
                    )}
                  </div>
                </div>
              )}

              {features.length > 0 && (
                <div className="text-sm text-gray-600">
                  <div className="font-medium mb-1">Features:</div>
                  <div className="flex flex-wrap gap-1">
                    {features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{features.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-3 text-xs text-gray-500 flex items-center">
                <Zap className="h-3 w-3 mr-1" />
                Interactive 3D Model - Click and drag to explore
              </div>
            </motion.div>
          )}

          {/* Close button for fullscreen */}
          {isFullscreen && (
            <motion.div
              className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button
                onClick={() => setIsFullscreen(false)}
                className="bg-luxury-blue hover:bg-blue-600 text-white shadow-lg"
              >
                Exit Fullscreen
              </Button>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
