function main(args) {
    console.log(args.event)
    return { body: [
        {"turn_turret_left": 15, 
         "shoot": true}
    ]}
}
