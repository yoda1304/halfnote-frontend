// The iOS 27 SDK refuses to launch apps without the UIScene life cycle. Expo SDK 57 ships
// ExpoAppSceneDelegate but its prebuild template doesn't wire it up; this mirrors the SDK 58
// template. Delete once on Expo SDK 58+.
const { withAppDelegate, withInfoPlist } = require("expo/config-plugins");

const START_REACT_NATIVE = /\n#if os\(iOS\) \|\| os\(tvOS\)\n\s*window = UIWindow\(frame: UIScreen\.main\.bounds\)\n\s*factory\.startReactNative\([\s\S]*?\)\n#endif\n/;

module.exports = (config) => {
  config = withInfoPlist(config, (c) => {
    c.modResults.UIApplicationSceneManifest = {
      UIApplicationSupportsMultipleScenes: false,
      UISceneConfigurations: {
        UIWindowSceneSessionRoleApplication: [
          {
            UISceneConfigurationName: "Default Configuration",
            UISceneDelegateClassName: "EXExpoAppSceneDelegate",
          },
        ],
      },
    };
    return c;
  });

  return withAppDelegate(config, (c) => {
    let src = c.modResults.contents;
    if (!src.includes("ExpoReactNativeFactoryProvider")) {
      src = src.replace(
        "class AppDelegate: ExpoAppDelegate {",
        "class AppDelegate: ExpoAppDelegate, ExpoReactNativeFactoryProvider {",
      );
    }
    if (!START_REACT_NATIVE.test(src) && src.includes("UIWindow(frame:")) {
      throw new Error("with-scene-lifecycle: AppDelegate template changed; update the plugin");
    }
    c.modResults.contents = src.replace(START_REACT_NATIVE, "\n");
    return c;
  });
};
