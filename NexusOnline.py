import discord
import sys
import socket
from threading import Thread
import time
import asyncio
from discord.ext import commands
from discord.ext.commands import Bot
import requests
import websocket

token = '<PASTE BOT TOKEN HERE>'

bot = commands.Bot(command_prefix='n!')
#channel = discord.utils.get(bot.guilds.channels, name="Channel_name_here", type="ChannelType.voice") 


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
                results.append(checkStatus('eu'))
                results.append(checkStatus('na'))
                results.append(checkLobby('duelingnexus.com', '80'))

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
                    if(results[0] != results[1]):
                        allOnline = False
                    else:
                        allOnline = True
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
                    if(allOnline == False):
                        await channel.send('To temporarily switch game servers, while one of them is offline, use the server settings at the bottom of the Duel Zone!', file=discord.File('status.png'))
                await asyncio.sleep(600)
        else:
            return

@bot.event
async def on_ready():
    print("Basic Bot: Successfully Booted Up!")
    print("Errors: ")
    return

def checkStatus(server):
    try:
        ws = websocket.WebSocket()
        ws.connect(f"wss://{server}.duelingnexus.com/gameserver/")
        status = ws.connected
        ws.close()
    except: 
        status = False
    return status

def checkLobby(host, port):
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
