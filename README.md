# tailf.io-cli

## Example

https://serverfault.com/questions/294218/is-there-a-way-to-redirect-output-to-a-file-without-buffering-on-unix-linux

On MacOS
script -q /dev/null ls -lahG ~ | tailf.io -h https://tailf.io/abcd

on ubuntu use unbuffer?
