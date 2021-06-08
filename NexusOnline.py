import discord
import sys
import socket
from threading import Thread
import time
import asyncio
from discord.ext import commands
from discord.ext.commands import Bot
import requests

token = '<PASTE TOKEN HERE>'

bot = commands.Bot(command_prefix='b!')


@bot.event
async def on_message(message):
    # we do not want the bot to reply to itself
    if message.author == bot.user:
        return
    channel = message.channel
    if message.content == 'n!start':
        if channel.name == 'server-status':
            oldresults = []
            while True:
                results = []
                message = ''
                results.append(checkStatus('eu.duelingnexus.com', '80'))
                results.append(checkStatus('na.duelingnexus.com', '80'))
                results.append(checkStatus('duelingnexus.com', '80'))

                if results == oldresults:
                    print('Status up to date')
                else:
                    oldresults = results
                    await channel.purge(limit=10)
                    print('Deleted Messages')
                    print('Updating status')
                    if results[0] == True:
                        message += '**EU Duel Server:** :green_circle: Online \n\n'
                    else:
                        message += '**EU Duel Server:** :red_circle: Offline \n\n'
                    if results[1] == True:
                        message += '**NA Duel Server:** :green_circle: Online \n\n'
                    else:
                        message += '**NA Duel Server:** :red_circle: Offline \n\n'
                    if results[2] == True:
                        message += '**Lobby Server:** :green_circle: Online'
                    else:
                        message += '**Lobby Server:** :red_circle: Offline'
                
                    await channel.send(message)
                    print('Sent message')
                    await asyncio.sleep(10)
                    print('Publishing message')
                    msgid = channel.last_message_id
                    channelid = channel.id
                    obj = {'Authorization': f'Bot {token}'}
                    url = f'https://discord.com/api/v6/channels/{channelid}/messages/{msgid}/crosspost'
                    print(url)
                    print(requests.post(url, headers=obj))
                await asyncio.sleep(600)
        else:
            return

@bot.event
async def on_ready():
    print("Basic Bot: Successfully Booted Up!")
    print("Errors: ")
    return

def checkStatus(host, port):
        args = socket.getaddrinfo(host, port, socket.AF_INET, socket.SOCK_STREAM)
        for family, socktype, proto, canonname, sockaddr in args:
            s = socket.socket(family, socktype, proto)
            try:
                s.connect(sockaddr)
            except socket.error:
                return False
            else:
                s.close()
                return True


bot.run(token)