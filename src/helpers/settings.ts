export class AppSettings {
  private static instance: AppSettings;
  private apiUrl = process.env.REACT_APP_MOCKAROO_URL || "";
  private apiKey = process.env.REACT_APP_MOCKAROO_KEY || "";

  private AppSettings() {
    this.apiUrl = "";
    this.apiKey = "";
  }

  public static getInstance(): AppSettings {
    if (!this.instance) {
      this.instance = new AppSettings();
    }

    return this.instance;
  }

  public getApiUrl() {
    return `${this.apiUrl}?key=${this.apiKey}`;
  }
}
