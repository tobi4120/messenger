import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatRoomConsumer(AsyncWebsocketConsumer):
    
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['convoCode']
        self.room_group_name = 'chat_%s' % self.room_name
        
        await self.channel_layer.group_add (
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)

        # Data
        id = text_data_json['id']
        message = text_data_json['message']
        sentAt = text_data_json['sentAt']
        user = text_data_json['user']
        convo = text_data_json['convo']

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chatroom_message',
                'id': id,
                'message': message,
                'sentAt': sentAt,
                'user': user,
                'convo': convo
            }
        )
    
    async def chatroom_message(self, event):
        # Data
        id = event['id']
        message = event['message']
        sentAt = event['sentAt']
        user = event['user']
        convo = event['convo']

        await self.send(text_data=json.dumps({
            'id': id,
            'message': message,
            'sentAt': sentAt,
            'user': user,
            'convo': convo
        }))