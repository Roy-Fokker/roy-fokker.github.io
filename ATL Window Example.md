# ATL vs Win32 to create Windows application window in C++

## Example Repository
[ATL Window Example Code](https://github.com/Roy-Fokker/atl_window_eg)

## Tour of Code
- Visual Studio solution setup <br>
  If you try to load the solution file from repository as-is, you will encounter errors, as VS won't be able to find the ```.props``` files.
  - ```.props``` files: I use some properties to setup all VS projects when on Windows using C++. These files basically tell VS and MSVC to comply with C++ standard as much as they can. <br>
  Contents of the files listed below.
- `main.cpp`: Standard ```main``` function.
  - [```#8```] I am using Windows API function to get Command Line parameters. However, this example doesn't use any.
  - [```#10-32```] All the example specific code is scoped in-between ```{}```
  - [```#14```] creates the window object, gives it size of the window and title.
  - [```#16-25```] tells the window object, what to do when key is pressed. Here I am using a lambda to check if ```Escape``` is pressed then to set ```exit_program``` variable to ```true```
  - [```#27```] tells the window object to show the window.
  - [```#28-31```] while loop will continue till either window object no longer has a Window, or untill ```exit_program``` variable is ```true```.
  - [```#30```] tell the window object to process the messages on the system queue for this window.
- `window` class
  - class abstracts away all the underlying implementation details.
  - In the ```.h``` file there are few specific types, to help with calling/creating window object.
    - ```size``` struct is for defining window size.
    - ```message_type``` enum lets consumer know what messages are supported.
    - ```max_message_types``` count of ```message_type``` enum values.
    - ```callback_method``` defines function format of callback method. All message types have same callback signature. Ideally it would be unique per message type.
    - ```atl_window_implementation``` and ```win32_window_implementation``` are forward declared, and type definition of ```window_impl_type``` is controlled by ```#define``` to switch between two implementation types.
  - In the window class's constructor, window is created, it's size adjusted such that ```window_size``` is actually the client rectangle of the window, its position is centered on the screen, and an icon is assigned to window, if one is provided (via .res file).
  - 
- ATL vs Win32
  - `atl_window_implementation` class
  - `win32_window_implementation` class

## Content of .props files
- `cppstd.17.props` <br>
  Setups VS2017 project to use C++17 without MS's extensions.
  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <Project ToolsVersion="4.0" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
    <ImportGroup Label="PropertySheets" />
    <PropertyGroup Label="UserMacros" />
    <PropertyGroup />
    <ItemDefinitionGroup>
      <ClCompile>
        <LanguageStandard>stdcpp17</LanguageStandard>
        <AdditionalOptions>/permissive- %(AdditionalOptions)</AdditionalOptions>
        <PreprocessorDefinitions>NOMINMAX;WIN32_LEAN_AND_MEAN;%(PreprocessorDefinitions)</PreprocessorDefinitions>
        <DiagnosticsFormat>Caret</DiagnosticsFormat>
        <ConformanceMode>true</ConformanceMode>
      </ClCompile>
    </ItemDefinitionGroup>
    <ItemGroup />
  </Project>
  ```
- `windows.MainCRTStartup.props` <br>
  Setups VS2017 project to use standard ```main``` function to start with instead of using ```winmain```.
  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <Project ToolsVersion="4.0" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
    <ImportGroup Label="PropertySheets" />
    <PropertyGroup Label="UserMacros" />
    <PropertyGroup />
    <ItemDefinitionGroup>
      <Link>
        <SubSystem>Windows</SubSystem>
      </Link>
    </ItemDefinitionGroup>
    <ItemDefinitionGroup>
      <Link>
        <EntryPointSymbol>mainCRTStartup</EntryPointSymbol>
      </Link>
    </ItemDefinitionGroup>
    <ItemGroup />
  </Project>
  ```