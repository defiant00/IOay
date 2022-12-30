## Data Flow

* Data flow programming, defining data transformation steps instead of specific programming instructions.
* Everything's immutable except for specific input/output blocks with some sort of synchronization method.
  * Possibly some sort of step/phase indicator, where any dirty commands have to wait for all dirty commands from the previous step to finish.
* All lazily evaluated.
* Blocks can have any number of strongly typed inputs and outputs.
* Equally usable as text or graphical node setup.
  * Comment or special syntax to store visual node metadata as text, so existing text tools are fully supported.
* Basic syntax is `label` `:` `data`

```
# function to repeat each line in a file twice

#! 0, 0 - possible node metadata location syntax
repeat_file_lines: fn(file str) -> void
  content: std.load_file(file)
  lines: content.split('\n')
  duped: lines.each(line => line + '\n' + line)
  joined: duped.join('\n')
  step
  std.save_file(file, joined)
/fn

# simpler in the case of single return values
repeat_file_lines: fn(file str) -> void
  res: std.load_file(file).split('\n').each(line => line + '\n' + line).join('\n')
  step
  std.save_file(file, res)
/fn

# if all steps are pure, only the return values that are actually used are calculated,
# so part or all of this function may not run
some_data: fn() -> (first str, second int)
  # do some calculations
  return.first 'yay'
  # other calculations
  return.second 12
/fn

fn(params as name type) -> void, single type, or multiple values as (name type)
eg:
fn(x int, y int) -> void
fn(x int) -> int
fn(name str) -> (success bool, index int)
```
