import { Awaitable, ClientEvents } from "discord.js";

export type ClientEventType = keyof ClientEvents;

export interface IListener<
  ClientEventKey extends ClientEventType = ClientEventType
> {
  once: boolean;
  event: ClientEventKey;
  handler(
    ...args: ClientEvents[ClientEventKey]
  ): Awaitable<void> | Promise<void>;
}

export abstract class BaseListener<
  ClientEventKey extends ClientEventType = ClientEventType
> implements IListener<ClientEventKey>
{
  constructor(
    public readonly event: ClientEventKey,
    private readonly _once = false
  ) {}

  public get once(): boolean {
    return this._once;
  }

  abstract handler(
    ...args: ClientEvents[ClientEventKey]
  ): Awaitable<void> | Promise<void>;
}

export type ListenerCtr = new () => IListener;
