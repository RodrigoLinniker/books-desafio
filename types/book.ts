export interface IVolumeInfo {
    title: string;
    description: string;
    averageRating: number;
    author: string;
  }
export interface InfoBook {
    id: string;
    volumeInfo: IVolumeInfo;
}