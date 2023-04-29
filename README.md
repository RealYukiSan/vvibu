# My collection of tools for watching anime :3

## Usage

First, build the source: `npm run build`

### Manipulate timestamp in subtitle file (srt)

`node ./dist/subtitle.js <srt_path_file> <duration> <operation>`

Explanation:

- `srt_path_file:` Path to srt file
- `duration:` duration time in second
- `operation:` operation to be performed, `subtract` | `add`
