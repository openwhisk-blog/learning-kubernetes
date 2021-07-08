// Slow Hello World
const sleep = ms => new Promise(res => setTimeout(res, ms))
async function main(args) {
        await sleep(1000)
	let name = args.name || "World"
	return { 
		"body": "Hello, "+name 
	}
}

