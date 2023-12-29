export type BuildMode = 'development' | 'production'
export type BuildPlatform = 'mobile' | 'desktop'

export type BuildPaths = {
  entry: string;
  html: string;
  output: string;
  src: string;
  public: string;
}

export type BuildOptions = {
  mode: BuildMode
  port: number;
  open?: string
  paths: BuildPaths;
  platform: BuildPlatform
  analyzer?: boolean
}