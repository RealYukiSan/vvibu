# My collection of tools for watching anime :3

## Work in Progress

## Included tools are:

- Downloader, e.g download subtitle and video from variant resources
- Subtitle Manager, e.g delay timestamp, etc...
- File and Folder Utility, e.g flat extract compressed file, auto-rename batch file (both subtitle and video file)

## Usage

First, build the source: `npm run build`

### Manipulate timestamp in subtitle file (srt)

`node ./dist/subtitle.js <srt_path_file> <duration> <operation>`

Explanation:

- `srt_path_file:` Path to srt file
- `duration:` duration time in second
- `operation:` operation to be performed, `subtract` | `add`

### Download batch subtitle: `<anime title>` `S<season>E<episode>`

e.g `Mirai Nikki S01E06`
