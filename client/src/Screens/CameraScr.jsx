import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowPathIcon,
  LifebuoyIcon,
  PhotoIcon,
} from "react-native-heroicons/outline";
import { styles } from "../theme/style";
const CameraScr = ({ navigation, route }) => {
  const [path, setPath] = useState("signup");
  useEffect(() => {
    if (route.params && route.params.path) {
      setPath(route.params.path);
    }
  }, []);
  const [hasPermission, setHasPermission] = useState(false);
  const [camera, setCamera] = useState(null);
  const [camDir, setCamDir] = useState(CameraType.back);
  //asking for camerapermission
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  //click picture
  const clickPic = async () => {
    const { uri } = await camera.takePictureAsync();
    return navigation.navigate(path, { avatar: uri });
  };
  // take img from lib
  const pickImage = async () => {
    const libPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (libPerm.granted === false) {
      return alert("Permission to Media Library is Required");
    }
    const data = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: false,
    });
    if (data.canceled) return;
    return navigation.navigate(path, { avatar: data.assets[0].uri });
  };

  return hasPermission ? (
    <SafeAreaView className="flex-1 bg-white relative">
      <Camera
        ref={(e) => setCamera(e)}
        ratio="1:1"
        style={{ aspectRatio: 1, flex: 1 }}
        type={camDir}
      />
      <View className="absolute flex-row bottom-6 items-center justify-evenly left-0 right-0">
        <TouchableOpacity onPress={pickImage}>
          <PhotoIcon size={30} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={clickPic}>
          <LifebuoyIcon size={40} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            camDir === CameraType.back
              ? setCamDir(CameraType.front)
              : setCamDir(CameraType.back)
          }
        >
          <ArrowPathIcon size={30} color={"white"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <Text style={styles.thick}>Permission to Camera Roll is Required</Text>
    </SafeAreaView>
  );
};

export default CameraScr;
