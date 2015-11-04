---
title: "Ubuntu inside Mac for Development"
layout: "post"
description: 
categories: [virtualize]
author: "Yi Yang"
---

Ubuntu is a great choice and provides much better Linux feeling than Mac OS X. And sometimes it's painful to configure the entire OS X dev box, thus I've decided to run Ubuntu with VMWare Fusion for development.

VMware is much more powerful than VirtualBox in terms of virtualization technology and features. It better protects my battery so I went for buying VMWare instead of using freewares.

It took me a few hours to configure everything to the state I desired - using simple command to wake up the Ubuntu VM and `ssh` into it. (Just like Vagrant, but it's a shame that they started to charge fees for vmware driver.) Also, having shared workspace / home folder between host OS X and guest Ubuntu made my life much easier.

Here's the step by step guide:

## 1. Set up path for VMWare binaries

We need to add VMWare Fusion paths in order to allow command line access. Adding the folling lines to `~/.bash_profile` would enable such feature.

{% highlight bash %}
if [ -d "/Applications/VMware Fusion.app/Contents/Library" ]; then
    export PATH=$PATH:"/Applications/VMware Fusion.app/Contents/Library"
fi
{% endhighlight %}

We could checkout the VMWare library through `vmrun`:

{% highlight bash %}
$ vmrun list
Total running VMs: 2
/Users/username/Documents/Virtual Machines.localized/Ubuntu.vmwarevm/Ubuntu.vmx
/Users/username/Library/Application Support/VMware Fusion/Virtual Machines/Boot Camp/Boot Camp.vmwarevm/Boot Camp.vmx
{% endhighlight %}

And we could futher run / suspend virtual machines via:

{% highlight bash %}
$ vmrun start /path/to/file.vmx
$ vmrun suspend /path/to/file.vmx
$ vmrun stop /path/to/file.vmx
{% endhighlight %}

## 2. Install guest Ubuntu machine

This step is straight forward, and we would need to install openssh-server on the vanilla box.

{% highlight bash %}
$ sudo apt-get install -y openssh-server
{% endhighlight %}

## 3. Set up network

3 Types of networks are available on VMWare Fusion ([official doc](http://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=1022264)):

- **Bridged**: Known as `vmnet0`, it bridges certain network adapter on host box and guest box. This is not useful unless we are in a fixed environment, with network status seldom updated.
- **Host Only**: Known as `vmnet1`, it creates a virtual network within the host OS and the traffic is normally locked within the network.
- **NAT**: Known as `vmnet8`, it acts similar as *Hosts Only* but provides routes for servers inside the network to access a wider range of network.

Here we would use NAT, or called *Shared with my Mac*. Rebooting network adapters on guest OS we would obtain a new IP address, under the same IP range as `vmnet8` on hosting mac.

## 4. Static IP address

It's necessary to manually set up IP address, so that we could always log in to the VM via SSH.

VMWare DHCP Service for `vmnet8` is configured at `/Library/Preferences/VMware Fusion/vmnet8/dhcpd.conf`, and we would neet to add the following lines to the bottom of file:

{% highlight cfg %}
host ubuntu {
    hardware ethernet 00:0C:29:30:66:BA;
    fixed-address 172.16.20.20;
}
{% endhighlight %}

MAC address of guest box is stored at each `vmx` file under the property `ethernet0.generatedAddress`.

Through rebooting VMWare Fusion app, we will be able to apply latest network changes.

## 5. Shared folders

Before using sharing folders, we would need to set up VMWare Tools (click that item from menu), folloed by the steps:

{% highlight bash %}
$ su -
$ apt-get install -y gcc linux-headers-$(uname -r) make
$ mount /dev/cdrom /mnt/cdrom
$ cd /tmp
$ tar zxpf /mnt/cdrom/VMwareTools-5.0.0-<xxxx>.tar.gz
$ umount /dev/cdrom
$ cd vmware-tools-distrib
$ ./vmware-install.pl
{% endhighlight %}

Sharing a folder is also straight forward. Detailed methods are descirbed [here](http://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=1004055). I'm sharing my home folder with Linux so that it could access nearly everything I need.

## 6. Linking default home folder

We would need to edit the home folder via `/etc/passwd`, where you find your username and home folder separated by `:`. We could simply the path `/home/{username}` to `/mnt/hgfs/{username}`.

However such an operation, on Ubuntu with VMWare Tools installed, will have files and folders belong to `501:dialout`, which is nearly impossible for us to do further operation. Followed by [Viraj's instruction](http://viraj-workstuff.blogspot.jp/2013/07/vmware-fusion-permissions-on-shared.html) this is resolved by:

1. `sudo vim /etc/vmware-tools/services.sh`
2. Search for `vmhgfs_mnt="/mnt/hgfs"`. After this line add: `vmuser=${VMWARE_MNT_USER:-root}`
3. Then search for `vmware_exec_selinux "mount -t vmhgfs .host:/ $vmhgfs_mnt"` and replace it with following section:
    {% highlight bash %}
    uid=`id --user $vmuser`
    gid=`id --group $vmuser`
    vmware_exec_selinux "mount -t vmhgfs .host:/ $vmhgfs_mnt -o uid=$uid,gid=$gid"
    {% endhighlight %}
4. sudo vim /etc/init/vmware-tools.conf
Before the "pre-start" and "post-stop" lines add:
    {% highlight bash %}
    env VMWARE_MNT_USER="[guest-user]"
    {% endhighlight %}
5. `sudo reboot`

As mentioned by Viraj, we would need to set it up again after upgrading VMWare Tools.

## 7. SSH Configuration & Shortcuts

To improve efficiency, we may need to create shortcut for SSH access. Firstly we need to configure `~/.ssh/config` file via injecting those lines on host OS X:

{% highlight cfg %}
Host ubuntu
Hostname 172.16.20.20
User [guest-user]
{% endhighlight %}

And also saving authorized_keys on host OS X (since the home folders are linked):

{% highlight bash %}
$ cat ~/.ssh/id_rsa.pub > ~/.ssh/authorized_keys
{% endhighlight %}

We may also want to specify host name at `/etc/hosts`

{% highlight cfg %}
172.16.20.20    ubuntu.localhost
{% endhighlight %}

## 8. Disable suspension (Enable running in background)

We need to add this to the `.vmx` file: `suspend.disabled = "TRUE"`

## Finale

After all those procedures, we could code happliy via `ssh ubuntu`.
