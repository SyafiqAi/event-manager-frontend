export interface EventFormValues {
  name: string;
  location: string;
  fromDate: Date | null;
  toDate: Date | null;
  thumbnail: FileList | null;
}
