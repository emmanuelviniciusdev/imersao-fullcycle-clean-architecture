export abstract class UsecaseAbstract<InputInterface, OutputInterface> {
    abstract execute(input: InputInterface): Promise<OutputInterface>
}
