class VideoSource:

    def __init__(self):
        self.video_path = None

    def set_video(self, video_path: str):
        self.video_path = video_path

    def get_video_path(self):
        return self.video_path

    def clear_video(self):
        self.video_path = None