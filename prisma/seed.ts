import { LandStatus, LandType, PrismaClient } from '@prisma/client'
import { Decimal } from 'decimal.js'

const prisma = new PrismaClient()

async function main() {
    const genesisUser = await prisma.user.create({
        data: {
            email: 'genesis@terrashare.com',
            username: 'genesis',
            displayName: 'Genesis',
            balance: new Decimal(1000000),
        }
    })

    const users = await Promise.all([
        prisma.user.create({
            data: {
                email: 'alice@example.com',
                username: 'alice',
                displayName: 'Alice',
                balance: new Decimal(50000),
            }
        }),
        prisma.user.create({
            data: {
                email: 'bob@example.com',
                username: 'bob',
                displayName: 'Bob',
                balance: new Decimal(30000),
            }
        })
    ])

    // Create genesis lands in a 10x10 grid
    const genesisLands = []
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            const baseValue = new Decimal(Math.random() * 10000 + 1000)
            const land = await prisma.land.create({
                data: {
                    name: `Genesis Land ${x}-${y}`,
                    description: `Premium genesis land at coordinates (${x}, ${y})`,
                    type: LandType.GENESIS,
                    status: LandStatus.AVAILABLE,
                    x,
                    y,
                    width: 1,
                    height: 1,
                    area: 1,
                    baseValue,
                    currentValue: baseValue,
                    ownerships: {
                        create: {
                            userId: genesisUser.id,
                            percentage: new Decimal(100),
                            acquiredPrice: baseValue,
                            isOriginalOwner: true,
                        }
                    }
                }
            })
            genesisLands.push(land)
        }
    }

    console.log(`Created ${genesisLands.length} genesis lands`)
    console.log(`Created ${users.length} test users`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })