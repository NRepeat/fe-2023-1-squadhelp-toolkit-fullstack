

use('shm-chat');

db.getCollection('messages')
.find(
	{
		body: { $regex: "паровоз" }
	}
)
.count();
