import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path'
import { InsertManyResult, MongoClient } from 'mongodb'

dotenv.config()

const {
  PORT_EXPRESS = '8000',
  PORT_MONGO = '27017',
  DB_NAME = 'music_play_list_db',
  COLLECTION_NAME = 'music_play_list'
} : { [prop: string]: string | undefined } = process.env

const app: Express = express()
const client = new MongoClient(`mongodb://MongoDBContainer:${PORT_MONGO}/`)

async function testConnectionDB(cb: Function){
  console.log('Connecting... to MongoDB')
  await client.connect()
  console.log('Connected to MongoDB Success')
  cb()
  client.close()
}

async function getAllPlayList() {
  await client.connect()

  const db = client.db(DB_NAME)
  const collection = db.collection(COLLECTION_NAME);
  const result = await collection.find({}).toArray();

  client.close()

  return result;
}

async function syncAllPlayList(playListArrayObject: [object]) {
  await client.connect()

  const db = client.db(DB_NAME)
  const collection = db.collection(COLLECTION_NAME);

  await collection.deleteMany({});

  let insertResult: InsertManyResult | Array<[]> = []

  if(playListArrayObject.length > 0) {
    insertResult = await collection.insertMany(playListArrayObject)
  }

  client.close()

  return insertResult
}

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(express.static(path.resolve()))

app.get('/get_all_playlist', async (req: Request, res: Response) => {
  const allPlayList = await getAllPlayList()

  res.send(allPlayList)
})

app.post('/sync_all_playlist', (req: Request, res: Response) => {
  const insertResult = syncAllPlayList(req.body)

  res.send(insertResult)
})

app.listen(PORT_EXPRESS, async () => {
 testConnectionDB(() => {
    console.log(`Music PlayList is running at http://localhost:${PORT_EXPRESS}`)
  })
});
