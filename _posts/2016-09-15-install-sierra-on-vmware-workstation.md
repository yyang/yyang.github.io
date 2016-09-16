---
title: "Install macOS Sierra on Windows VMWare Workstation"
layout: "post"
description: 
categories: [virtualize]
author: "Yi Yang"
---

Inspired by a post on [InsanelyMac](http://www.insanelymac.com/forum/topic/309556-run-vanilla-os-x-el-capitan-yosemite-or-mavericks-in-vmware-workstation-12-on-a-windows-host/), the installation would be as simple as following:

### 0. Prerequisites

VMware Workstation 11 or 12.

### 1. Prepare the macOS Sierra installer

The installer could be extracted from `Install macOS Sierra.app` which is avalable via App Store.

While the package is ready, we could use a [`spoiler.sh` file](https://gist.github.com/yyang/8d0e5d0ce45957a2b0218e7576f917b5/archive/9abaccffcdba26268588a661f40bd84b0cb7bfb0.zip) to create an iso-formated installer.

The spoiler is also copied here:

```
#!/bin/bash

# Mount the Installer image
hdiutil attach /Applications/Install\ macOS\ Sierra.app/Contents/SharedSupport/InstallESD.dmg -noverify -nobrowse -mountpoint /Volumes/install_app

# Create Sierra sparseimage of 7316mb with a Single Partition - Apple Partition Map
hdiutil create -o /tmp/Sierra -size 7316m -layout SPUD -fs HFS+J -type SPARSE

# Mount the Sierra sparseimage
hdiutil attach /tmp/Sierra.sparseimage -noverify -nobrowse -mountpoint /Volumes/install_build

# Restore the Base System into the Sierra Blank sparseimage
asr restore -source /Volumes/install_app/BaseSystem.dmg -target /Volumes/install_build -noprompt -noverify -erase

# Remove Packages link and replace with actual files
rm /Volumes/OS\ X\ Base\ System/System/Installation/Packages
cp -rp /Volumes/install_app/Packages /Volumes/OS\ X\ Base\ System/System/Installation/

# Copy Sierra installer dependencies
cp -rp /Volumes/install_app/BaseSystem.chunklist /Volumes/OS\ X\ Base\ System/BaseSystem.chunklist
cp -rp /Volumes/install_app/BaseSystem.dmg /Volumes/OS\ X\ Base\ System/BaseSystem.dmg

# Unmount the installer image
hdiutil detach /Volumes/install_app

# Unmount the Base System image
hdiutil detach /Volumes/OS\ X\ Base\ System/

# Convert the Sierra spareseimage image to ISO/CD master
hdiutil convert /tmp/Sierra.sparseimage -format UDTO -o /tmp/Sierra.iso

# Rename the Sierra ISO image and move it to the desktop
mv /tmp/Sierra.iso.cdr ~/Desktop/'Sierra 10.11.0.iso'

# Delete Sierra.sparseimage file
rm -f /tmp/Sierra.sparseimage
```

### 2. Unlock VMware for macOS Support

Download and install the VMware Unlocker 2.0 via `win-install.cmd` or `lnx-install.sh`.

VMware Unlocker 2.0.8: [Download](http://www.insanelymac.com/forum/files/file/339-unlocker/) or [Mirror](http://http://tech.yyang.me/docs/20160915-unlocker208.zip)

*Note*: You are required to reinstall everytime VMware upgrades.

### 3. Install macOS

We are able to select *OS X* as system type while creating new VM.

*Note*: Each time we create a new macOS virtual machine using hardware version 12, we need to append `smc.version = "0"` at the end of `.vmx` file.

### 4. TrackPad Support

Whoops I'm still working on that.
