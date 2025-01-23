interface PrinterDriver {
  print: (receipt: Receipt) => Promise<void>
  cleanUp: () => Promise<void>
  checkStatus: () => Promise<boolean>
}

type Path = string

interface Receipt {
  id: string | number
  name: string
  price: number
  quantity: number
  template: Path
}

class TSPIVPrinter implements PrinterDriver {
  async print(receipt: Receipt): Promise<void> {
    // eslint-disable-next-line no-console
    console.log('TSP IV Printer: Printing receipt', receipt)
    // Implement actual printing logic here
  }

  async cleanUp(): Promise<void> {
    // eslint-disable-next-line no-console
    console.log('TSP IV Printer: Cleaning up print job...')
    // Implement actual cleanup logic here
  }

  async checkStatus(): Promise<boolean> {
    // eslint-disable-next-line no-console
    console.log('TSP IV Printer: Checking online status...')
    // Implement actual status check logic here
    return true // Return actual status
  }
}

// Export the TSP IV printer instance
export const tspIVPrinter: PrinterDriver = new TSPIVPrinter()
