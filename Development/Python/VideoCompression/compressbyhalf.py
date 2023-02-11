import cv2

input_video = "input.mov"
output_video = "output.mp4"

# Open the input video
cap = cv2.VideoCapture(input_video)

# Get the frames per second (fps) of the input video
fps = cap.get(cv2.CAP_PROP_FPS)

# Get the width and height of frames in the video
frame_width = int(cap.get(3))
frame_height = int(cap.get(4))

# Define the codec and create VideoWriter object
fourcc = cv2.VideoWriter_fourcc(*'mp4v') # Be sure to use lower case
out = cv2.VideoWriter(output_video, fourcc, fps, (frame_width//2, frame_height//2))

# Read the frames from the input video
while True:
    ret, frame = cap.read()
    if not ret:
        break
        
    # Reduce the resolution of the frame
    frame = cv2.resize(frame, (frame_width//2, frame_height//2))
    
    # Write the frame to the output video
    out.write(frame)

# Release the VideoWriter and VideoCapture objects
cap.release()
out.release()
