---
layout: post
title: "How to create an Azure IoT Central application programmatically?"
author: poanchen
date: 2019-11-23 08:30:30
tags:
- Azure
- Azure IoT
- Azure IoT Central
- Node.js
- PoAn (Baron) Chen
- TypeScript
---
Before I dive into the code and show you guys how to create an Azure IoT Central application programmatically, I would like to give an introduction of what an Azure IoT Central is and why do we need it?

[Azure IoT Central](https://azure.microsoft.com/en-us/services/iot-central) is a

> Connect fast with a hassle-free, hosted IoT platform<br><br>
Easily connect, monitor, and manage your Internet of Things (IoT) assets at scale. Azure IoT Central is a hosted, extensible software as a service (SaaS) platform that simplifies setup of your IoT solution and helps reduce the burden and costs of IoT management, operations, and development. Provide customers superior products and service while expanding your business possibilities.

Looks like this platform is a perfect fit for business who already have tons of devices and wish to have them connected to the cloud and able to manage them easily and effortless. Wish to connect your MXChip IoT DevKit, Raspberry Pi, Windows IoT Core device, SensorTile.box device and RuuviTag sensor to [Azure IoT Central](https://azure.microsoft.com/en-us/services/iot-central)? Follow [this](https://docs.microsoft.com/en-us/azure/iot-central/core/howto-connect-devkit) tutorial to do it. Wish to have more information on this great product? Check it out [here](https://azure.microsoft.com/en-us/services/iot-central/).

This should gives you some idea of what an Azure IoT Central is and how it can be useful for people who just want to [try](https://apps.azureiotcentral.com/) it out as well as enterprise customers who already have tons of devices that are waiting for it to be connected and started to send some telemetry data.

Let's get to the coding part, shall we?

Before you can create any resource in [Azure Portal](https://azure.microsoft.com/en-us/features/azure-portal/), you would need to have an account with them. Create your Azure free account over [here](https://azure.microsoft.com/en-us/free/) today to get started.

Next, you would also need a subscription id, don't have it? Follow [this](https://blogs.msdn.microsoft.com/mschray/2016/03/18/getting-your-azure-subscription-guid-new-portal/) short tutorial to get one.

You would also need a resource group before you can create any application within the Azure IoT Central, create one over at the [Azure Portal](https://portal.azure.com/#blade/HubsExtension/BrowseResourceGroups) or create [one](https://docs.microsoft.com/en-us/azure/azure-resource-manager/deploy-to-subscription) through the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/?view=azure-cli-latest).

Okay, now that you have an account with Azure Portal, subscription id, and resource group. You should now have everything you need to create an Azure IoT Central application programmatically.

For simplicity, we are going to use [TypeScript](https://www.typescriptlang.org) as our primary programming language.

Note: Please take a look at [this](https://github.com/emgarten/iotcentral-arm-sdk-examples) repo in case TypeScript isn't your language. We provide examples/sample code for Azure IoT Central in NodeJs/TypeScript, Python, .Net, Ruby, Java, and Go. (Not officially from Microsoft)

Let's start with importing the necessary node modules,

{% highlight TypeScript %}
  import * as msRestNodeAuth from "@azure/ms-rest-nodeauth";
  import { IotCentralClient } from "@azure/arm-iotcentral";
  import { App, OperationInputs } from "@azure/arm-iotcentral/src/models/index";
  import { AppPatch } from "@azure/arm-iotcentral/esm/models";
{% endhighlight %}
<a href="https://github.com/poanchen/iotcentral-arm-sdk-examples/blob/master/nodejs/index.ts" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

**@azure/ms-rest-nodeauth** are needed for authentication in Azure.
**@azure/arm-iotcentral** are needed for creating/updating/deleting resources in Azure IoT Central.

Next, you would also need to hard-code your sensitive information in the code so that Azure IoT Central can use it to create resource for you. (It is recommended that you use [environment variable](https://github.com/poanchen/auto-submit-pro-unlimited-work-hours-form/blob/master/.env.example) to store your secrets instead of putting it in the code)

{% highlight TypeScript %}
  const SUBSCRIPTIONID: string = "FILL IN SUB ID";
  const RESOURCEGROUPNAME: string = "myResourceGroup";
  const RESOURCENAME: string = "my-app-name";

  const NAME: OperationInputs = {
    name: RESOURCENAME
  }
  const NEWAPP: App = {
    subdomain: RESOURCENAME,
    sku: {
        name: 'ST2' // Don't know what ST2 is? Check out this website, https://azure.microsoft.com/en-us/pricing/details/iot-central/
    },
    location: 'unitedstates',
    displayName: RESOURCENAME
  };
  const UPDATEAPP: AppPatch = {
    displayName: RESOURCENAME + "-new-name"
  };
{% endhighlight %}
<a href="https://github.com/poanchen/iotcentral-arm-sdk-examples/blob/master/nodejs/index.ts" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

The code usually begins with a login, (we write it as an async function since we are trying to avoid [callback hells](https://poanchen.github.io/blog/2019/06/19/The-right-way-to-manage-nested-callbacks))

{% highlight TypeScript %}
  async function login(): Promise<msRestNodeAuth.DeviceTokenCredentials> {
    const creds = await msRestNodeAuth.interactiveLogin();
    return new Promise<msRestNodeAuth.DeviceTokenCredentials>(resolve => resolve(creds));
  }
{% endhighlight %}
<a href="https://github.com/poanchen/iotcentral-arm-sdk-examples/blob/master/nodejs/index.ts" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Once you are logged-in, let's check if your app name is available since at the end, your url will look like my-app-name.azureiotcentral.com

{% highlight TypeScript %}
  async function checkIfNameExist(creds): Promise<IotCentralClient> {
    const client = new IotCentralClient(creds, SUBSCRIPTIONID);
    const result = await client.apps.checkNameAvailability(NAME);
    console.log(result);
    return new Promise<IotCentralClient>(resolve => resolve(client));
  }
{% endhighlight %}
<a href="https://github.com/poanchen/iotcentral-arm-sdk-examples/blob/master/nodejs/index.ts" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Next, you would also need to create an application within the Azure IoT Central in order to provision and monitor your devices.

{% highlight TypeScript %}
  async function createOrUpdateApp(client): Promise<IotCentralClient> {
    const result = await client.apps.createOrUpdate(RESOURCEGROUPNAME, RESOURCENAME, NEWAPP);
    console.log(result);
    return new Promise<IotCentralClient>(resolve => resolve(client));
  }
{% endhighlight %}
<a href="https://github.com/poanchen/iotcentral-arm-sdk-examples/blob/master/nodejs/index.ts" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Once the Azure IoT Central's application is created. You can access it through my-app-name.azureiotcentral.com

Ever want to see information about your application? do the following,

{% highlight TypeScript %}
  async function retrieveAppInfo(client): Promise<IotCentralClient> {
    const result = await client.apps.get(RESOURCEGROUPNAME, RESOURCENAME)
    console.log(result);
    return new Promise<IotCentralClient>(resolve => resolve(client));
  }
{% endhighlight %}
<a href="https://github.com/poanchen/iotcentral-arm-sdk-examples/blob/master/nodejs/index.ts" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

You can also update application's display name by doing this, (not your domain name)

{% highlight TypeScript %}
  async function updateApp(client): Promise<IotCentralClient> {
    const result = await client.apps.update(RESOURCEGROUPNAME, RESOURCENAME, UPDATEAPP);
    console.log(result);
    return new Promise<IotCentralClient>(resolve => resolve(client));
  }
{% endhighlight %}

If you wanna see all your applications under a specific resource group name, do the following,

{% highlight TypeScript %}
  async function listAllAppsByResourceGroup(client): Promise<IotCentralClient> {
    const result = await client.apps.listByResourceGroup(RESOURCEGROUPNAME);
    console.log(result);
    return new Promise<IotCentralClient>(resolve => resolve(client));
  }
{% endhighlight %}

You can also delete application programmatically by doing this,

{% highlight TypeScript %}
  async function deleteApp(client): Promise<IotCentralClient> {
    const result = await client.apps.deleteMethod(RESOURCEGROUPNAME, RESOURCENAME);
    console.log(result);
    return new Promise<IotCentralClient>(resolve => resolve(client));
  }
{% endhighlight %}
<a href="https://github.com/poanchen/iotcentral-arm-sdk-examples/blob/master/nodejs/index.ts" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Finally, call the async function like this,

{% highlight TypeScript %}
  login()
    .then(checkIfNameExist)
    .then(createOrUpdateApp)
    .then(retrieveAppInfo)
    .then(updateApp)
    .then(listAllAppsByResourceGroup)
    // .then(deleteApp)
    .then(() => {
        console.log("done");
    })
    .catch(err => {
        console.log('An error occurred:');
        console.dir(err, {
            depth: null,
            colors: true
        });
    });
{% endhighlight %}
<a href="https://github.com/poanchen/iotcentral-arm-sdk-examples/blob/master/nodejs/index.ts" target="_blank">source code</a> hosted on <a href="https://github.com" target="_blank">GitHub</a>

Now, you have learned to login, check if app name is available, create or update app, retrieve app info, update an app, list all the applications under a specific resource group name, delete app within Azure IoT Central.

Okay, do let me know in the comments below if you have any questions/concerns and I would be happy to help in any way. Happy using [Azure IoT Central](https://azure.microsoft.com/en-us/services/iot-central/)!

## Wrapping Up

Hopefully you enjoyed this article and will inspire you to try out [Azure IoT Central](https://azure.microsoft.com/en-us/services/iot-central/) if you have not done so. Let me know if this helps you. Thank you for reading!

## Resources

I'll try to keep this list current and up to date. If you know of a great resource you'd like to share or notice a broken link, please [let us know](https://github.com/poanchen/poanchen.github.io/issues/new?title=&body=%0A%0A%0A%5BEnter+feedback+here%5D%0A%0A%0A---%0A%23%23%23%23+Document+Details%0A%0A%E2%9A%A0+*Do+not+edit+this+section.*%0A%0A*+Blog+URL%3A+%5B{{ page.title }}%5D({{ site.url }}{{ page.url }})%0A*+GitHub+Source+URL%3A+%5B{{ page.url | split: "/" | slice: 5}}.md%5D(https://github.com/poanchen/poanchen.github.io/blob/will-jekyll-template/_posts/{{ page.date | date: "%Y-%m-%d" }}-{{ page.url | split: "/" | slice: 5}}.md)).

### Getting started

* [Azure IoT Central](https://azure.microsoft.com/en-us/services/iot-central/) by [Microsoft](https://microsoft.com)
* [Azure](https://azure.microsoft.com/en-us/free/) by [Microsoft](https://microsoft.com)
* [Connect an MXChip IoT DevKit device to your Azure IoT Central application](https://docs.microsoft.com/en-us/azure/iot-central/core/howto-connect-devkit) by [Microsoft](https://microsoft.com)
* [Azure IoT Central pricing](https://azure.microsoft.com/en-us/pricing/details/iot-central/) by [Microsoft](https://microsoft.com)