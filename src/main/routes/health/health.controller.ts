import { Controller, Get } from '@nestjs/common'
import prisma from 'infra/prisma'

@Controller('healthz')
export class HealthController {
  @Get('/startup')
  async healthCheck() {
    await prisma.$connect()
    return { status: 'ok' }
  }
}
